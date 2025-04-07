declare module 'solarlunar' {
    export function solar2lunar(
      year: number,
      month: number,
      day: number
    ): {
      year: number;
      month: number;
      day: number;
      lunarYear: number;
      lunarMonth: number;
      lunarDay: number;
      leap: boolean;
      zodiac: string;
      ganzhiYear: string;
      ganzhiMonth: string;
      ganzhiDay: string;
      animal: string;
      term: string;
    };
  
    export function lunar2solar(
      year: number,
      month: number,
      day: number,
      isLeapMonth?: boolean
    ): {
      year: number;
      month: number;
      day: number;
      zodiac: string;
      ganzhiYear: string;
      ganzhiMonth: string;
      ganzhiDay: string;
      animal: string;
      term: string;
    };
  }
  