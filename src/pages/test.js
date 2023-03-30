// import React from 'react';
// import { Tree } from 'react-d3-tree';
// import { Box } from '@chakra-ui/react';

// const treeData = {
//   name: 'Grandpa',
//   children: [
//     {
//       name: 'Dad',
//       children: [
//         {
//           name: 'Me',
//         },
//         {
//           name: 'Brother',
//         },
//       ],
//     },
//     {
//       name: 'Uncle',
//       children: [
//         {
//           name: 'Cousin 1',
//         },
//         {
//           name: 'Cousin 2',
//         },
//       ],
//     },
//   ],
// };

// const myTreeStyles = {
//   links: {
//     stroke: '#6b6b6b',
//   },
//   nodes: {
//     node: {
//       circle: {
//         fill: '#5a5a5a',
//       },
//     },
//     leafNode: {
//       circle: {
//         fill: '#3a3a3a',
//       },
//     },
//   },
// };

// const Test = () => {
//   return (
//     <Box maxW="md" mx="auto">
//       <Tree data={treeData} translate={{ x: 100, y: 100 }} orientation="vertical" separation={{ siblings: 2, nonSiblings: 2 }} nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10 } }} styles={myTreeStyles} />
//     </Box>
//   );
// };

// export default Test;

import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Box } from '@chakra-ui/react';
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
    const children = familyData.filter((person) => person.parent === parent);
    if (children.length === 0) {
      return null;
    }
    return {
      name: parent,
      children: children.map((child) => generateTreeData(familyData, child.name)),
    };
  };
  
  const Test = generateTreeData(familyData, null);
