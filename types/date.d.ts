import dayjs from "dayjs";
import { solar2lunar, lunar2solar } from "solarlunar";
export interface Date {
    solar: dayjs.Dayjs;
    lunar: solar2lunar.lunar2solar;
}


