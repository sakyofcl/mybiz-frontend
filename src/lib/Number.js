class Number {
   static thousandSeprater(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }
}
export default Number;
