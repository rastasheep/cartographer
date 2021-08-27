import { Injectable } from '@angular/core';
import { MappablePin, Pin, PinType } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MappablePinService {
  private static iconSize: [number, number] = [28, 28];
  private static icons = {
    [PinType.SUP_ENTRY]: {
      original: 'http://maps.google.com/mapfiles/dir_walk_60.png',
      hover: 'http://maps.google.com/mapfiles/dir_60.png'
    }
  };

  constructor() { }

  decorate(pin: Pin | MappablePin): MappablePin {
    return {
      ...pin,
      options: {
        icon: {
          url: MappablePinService.icons[pin.type].original,
        }
      }
    };
  }

  hoverState(pin: MappablePin): MappablePin {
    const icon = {
      ...pin.options.icon,
      url: MappablePinService.icons[pin.type].hover
    };
    const options = { ...pin.options, icon };

    return { ...pin, options };
  }
}
