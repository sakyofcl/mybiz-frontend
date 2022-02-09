function HeadNode(props) {
   return <ul>{props.children}</ul>;
}
function ChildNode(props) {
   return <li>{props.children}</li>;
}
function NodeItem(props) {
   return <div className='tree-node'>{props.children}</div>;
}

function TreeView(props) {
   return <div className='tree-view'>{props.children}</div>;
}
function Tree(props) {
   const { ori, children } = props;
   let orient = 'horizontal';
   switch (ori) {
      case 'h':
         orient = 'horizontal';
         break;
      case 'v':
         orient = 'vertical';
         break;
      default:
         break;
   }
   return (
      <ul className={`tree ${orient}`}>
         <li>{children}</li>
      </ul>
   );
}

Tree.defaultProps = {
   ori: 'h',
};
export { TreeView, Tree, NodeItem, ChildNode, HeadNode };
