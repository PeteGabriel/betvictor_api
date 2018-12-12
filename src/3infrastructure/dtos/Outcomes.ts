
export class Outcomes {
  public readonly id: number;
  public readonly description: string;
  public readonly price_decimal: number;
  public readonly price: string;
  public readonly price_id: number;
  public readonly print_order: number;
  public readonly opponent_id: undefined;
  public readonly deduction: boolean;
  public readonly sp: boolean;
  public readonly nr: boolean;
  public readonly market: string;
  public readonly market_id: number;
  public readonly race_card_no: number;

  public constructor(d: any) {
    this.id = d.id;
    this.description = d.description;
    this.price_decimal = d.price_decimal;
    this.price = d.price;
    this.price_id = d.price_id;
    this.print_order = d.print_order;
    this.opponent_id = d.opponent_id;
    this.deduction = d.deduction;
    this.sp = d.sp;
    this.nr = d.nr;
    this.market = d.market;
    this.market_id = d.market_id;
    this.race_card_no = d.race_card_no;
  }
}