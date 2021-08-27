import { Component, OnInit } from '@angular/core';
import { ExploreFacadeService, ExploreState } from '@app/explore/services/explore-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  vm$: Observable<ExploreState> = this.ExploreFacade.vm$;

  constructor(public ExploreFacade: ExploreFacadeService) {}

  ngOnInit(): void {
  }
}
