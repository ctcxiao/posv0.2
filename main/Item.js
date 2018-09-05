module.exports = class Item{

    constructor(price, unit, name, quality, totalPrice){
        this.name = name;
        this.price = price;
        this.quality = quality;
        this.unit = unit;
        this.totalPrice = totalPrice;
    }
}

