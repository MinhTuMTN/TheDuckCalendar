declare module 'solarlunar' {
    export function solar2lunar(
      year: number,
      month: number,
      day: number
    ): {
      animal: string;
      cDay: number;
      cMonth: number;
      cYear: number;
      isLeap: boolean;
      isTerm: boolean;
      isToday: boolean;
      lDay: number;
      lMonth: number;
      lYear: number;
    };
  
    export function lunar2solar(
      year: number,
      month: number,
      day: number,
      isLeapMonth?: boolean
    ): {
      animal: string;
      cDay: number;
      cMonth: number;
      cYear: number;
      isLeap: boolean;
      isTerm: boolean;
      isToday: boolean;
      lDay: number;
      lMonth: number;
      lYear: number;
    };
    export function monthDays(year: number, month: number): number;
  }
  