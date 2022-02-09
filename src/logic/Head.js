class Head {
   static title = '';

   static setTitle(text = Head.title) {
      window.document.title = text;
   }
}
export { Head };
