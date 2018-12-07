import {MomentInput} from 'moment';

export interface Data {
  id: Number;
  room_temp: Number;
  status: Boolean;
  fulldate: MomentInput;
}
