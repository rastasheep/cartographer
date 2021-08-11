variable credentials_path {
  type = string
  default = "./account.json"
  description = "Location of the credential file."
}

variable project_id {
  type = string
  default = "cartographer-322216"
  description = "Google project id"
}

provider "google-beta" {
  credentials = file(var.credentials_path)
}


resource "google_firebase_project" "default" {
  provider = google-beta
  project = var.project_id
}

resource "google_firebase_web_app" "basic" {
  provider = google-beta
  project = var.project_id

  display_name = "cartographer-test"

  depends_on = [google_firebase_project.default]
}

data "google_firebase_web_app_config" "basic" {
  provider = google-beta
  project = var.project_id

  web_app_id = google_firebase_web_app.basic.app_id
}

resource "google_storage_bucket" "default" {
  provider = google-beta
  project = var.project_id

  name = "cartographer-test"
}

resource "google_storage_bucket_object" "default" {
    provider = google-beta
    bucket = google_storage_bucket.default.name
    name = "firebase-config.json"

    content = jsonencode({
        appId = google_firebase_web_app.basic.app_id
        apiKey = data.google_firebase_web_app_config.basic.api_key
        authDomain = data.google_firebase_web_app_config.basic.auth_domain
        databaseURL = lookup(data.google_firebase_web_app_config.basic, "database_url", "")
        storageBucket = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
        messagingSenderId = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
        measurementId = lookup(data.google_firebase_web_app_config.basic, "measurement_id", "")
    })
}

resource "google_app_engine_application" "app" {
  project = var.project_id
  database_type= "CLOUD_FIRESTORE"
  location_id = "us-central"
}

// Firestore rules:
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read;
//       allow write: if request.auth != null;
//     }
//   }
// }

resource "google_firestore_document" "mydoc" {
  project = var.project_id

  collection  = "items"
  document_id = "1"
  fields      = "{\"name\":{\"stringValue\":\"world\"}}"
}
