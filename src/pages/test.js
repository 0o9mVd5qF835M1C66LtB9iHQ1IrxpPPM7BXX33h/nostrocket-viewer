import React, { useState } from 'react';
import { Box} from "@chakra-ui/react";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;
const familyData = [
  { name: 'Grandpa', parent: null },
  { name: 'Dad', parent: 'Grandpa' },
  { name: 'Me', parent: 'Dad' },
  { name: 'My Brother', parent: 'Dad' },
  { name: 'Uncle', parent: 'Grandpa' },
  { name: 'Cousin 1', parent: 'Uncle' },
  { name: 'Cousin 2', parent: 'Uncle' },
  { name: 'Cousin 3', parent: 'Uncle' },
];
const generateTreeData = (familyData, parent) => {
  const parentNode = familyData.filter((person) => person.name === parent)
  const node = { name: parentNode };
  const children = familyData.filter((person) => person.parent === parent);

  if (children.length === 0) {
    return node;
  }

  node.children = children.map((child) => generateTreeData(familyData, child.name));
  return node;
};

// const generateTreeData = (familyData, parent) => {
//   const children = familyData.filter((person) => person.parent === parent);
//   if (children.length === 0) {
//     return null;
//   }
//   return {
//     name: parent,
//     children: children.map((child) => generateTreeData(familyData, child.name)),
//   };
// };

// const Test = () => {
//   const treeData = generateTreeData(familyData, null);
//   return (
//     <Tree label={<StyledNode>Root</StyledNode>}>
//       <TreeNode label={<StyledNode>{treeData.name}</StyledNode>}>
//         {treeData.children.map((child) => (
//           <TreeNode label={<StyledNode>{child.name}</StyledNode>}>
//             {child.children && child.children.length > 0 && child.children.map((grandChild) => (
//               <TreeNode label={<StyledNode>{grandChild.name}</StyledNode>} />
//             ))}
//           </TreeNode>
//         ))}
//       </TreeNode>
//     </Tree>
//   );
// };

// export default Test;

// function TreeNodeadd(props) {
// //   <TreeNode label={<StyledNode>{child.name}</StyledNode>}>
// //      {child.children && child.children.length > 0 && child.children.map((grandChild) => (
// //  <TreeNode label={<StyledNode>{grandChild.name}</StyledNode>} />
// //             ))}
// //          </TreeNode>
//   return (
//     <TreeNode>
//       <TreeNode>{props.label}</TreeNode>
//       {props.children}
//     </TreeNode>
//   );
// }

function Test() {
  const [treeData, setTreeData] = useState(generateTreeData(familyData, null));
  console.log(treeData)
  function renderTreeData(data) {
    return data.map(item => (
      <TreeNode label={item.name}>
        {item.children && renderTreeData(item.children)}
      </TreeNode>
    ));
  }

  return (
    <Tree>
      {renderTreeData([treeData])}
    </Tree>
  );
}


// const TreeChart = ({ data }) => {

//   if (data.children === null) {
//     return null;
//   }

//   return (
//     <Tree
//       lineWidth={'2px'}
//       lineHeight={'30px'}
//       lineColor={'#ccc'}
//       lineBorderRadius={'10px'}
//       label={<TreeNode node={data} />}
//     >
//       </Tree>

//   );
// };




// const Test = () => {
//   const treeData = generateTreeData(familyData, null);
//   console.log(treeData,'treeData')
//   return <TreeChart data={familyData} />;   }
export default Test;
