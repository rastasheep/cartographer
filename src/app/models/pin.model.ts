import { LatLngLiteral, Icon } from './map.model';

export enum PinType {
  SUP_ENTRY = 1,
}

export interface Pin {
  id: number;
  type: PinType;
  title: string;
  position: LatLngLiteral;
}

export interface MappablePin extends Pin {
  options: {
    icon: Icon;
  }
}
