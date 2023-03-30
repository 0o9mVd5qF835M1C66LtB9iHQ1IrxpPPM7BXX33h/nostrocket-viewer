import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

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

const Test = () => {
  const treeData = generateTreeData(familyData, null);
  return (
    <Tree label={<div>Root</div>}>
      <TreeNode label={<div>{treeData.name}</div>}>
        {treeData.children.map((child) => (
          <TreeNode label={<div>{child.name}</div>}>
            {child.children && child.children.length > 0 && child.children.map((grandChild) => (
              <TreeNode label={<div>{grandChild.name}</div>} />
            ))}
          </TreeNode>
        ))}
      </TreeNode>
    </Tree>
  );
};

export default Test;