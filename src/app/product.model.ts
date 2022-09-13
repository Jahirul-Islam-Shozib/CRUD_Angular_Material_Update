export class ProductModel{
  constructor(
    public id:number,
    public name:string,
    public category: string,
    public date:Date,
    public quality:string,
    public price:number,
    public comment:string){}
}