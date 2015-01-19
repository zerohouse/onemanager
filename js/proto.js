Date.prototype.getFormattedString = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return year + "-" + month + "-" + day;
}