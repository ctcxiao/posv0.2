const Item = require('./Item.js');

const loadAllItems = require('./loadAllItems.js');

module.exports = function main(input) {
    let all = loadAllItems();
    let itemList = createItemList(all, input);
    let itemListWithQuality = itemList.filter(item=>item.quality!==0);
    let displayItemString = itemListWithQuality.reduce((result, item) => result+displayItem(item), "");
    return createTitle() + displayItemString + createFooter(itemList);
};

function displayItem(item) {
    return `名称：${item.name}，数量：${item.quality}${item.unit}，单价：${item.price.toFixed(2)}(元)，小计：${(item.price * item.quality).toFixed(2)}(元)\n`;
}

function createTitle() {
    return '***<没钱赚商店>购物清单***\n';
}

function createFooter(itemList) {
    let footer = '----------------------\n';
    footer += createTotal(itemList);
    return footer += '**********************'
}

function calculateTotalPrice(itemList) {
    return itemList.map(item => item.totalPrice).reduce((a, b) => a + b);
}

function createTotal(itemList) {
    let totalPrice = calculateTotalPrice(itemList);
    return "总计："+totalPrice.toFixed(2)+"(元)\n";
}

function createItemList(allItem, input) {
    let itemList = [];
    allItem.forEach(value => {
        let itemObject = new Item(value.price, value.unit, value.name);
        itemObject.quality = input.filter(item => value.barcode === item).length;
        itemObject.totalPrice = itemObject.quality*itemObject.price;
        itemList.push(itemObject);
    });
    return itemList;
}