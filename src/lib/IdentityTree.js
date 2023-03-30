import React from 'react';
import { Box} from "@chakra-ui/react";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';


const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const generateTreeData = (familyData, parent) => {
  const node = { name: parent };
  const children = familyData.filter((person) => person.parent === parent);

  if (children.length === 0) {
    return node;
  }

  node.children = children.map((child) => generateTreeData(familyData, child.name));
  return node;
};
const generateIdentityTreeData = (event, parent) => {

  const identitieRaw = JSON.parse(event.content).identity;
  console.log(identitieRaw)
  const identities = Object.entries(identitieRaw).map(([id, info]) => {
    const account = info.Account;
    if (info.UniqueSovereignBy === "1Humanityrvhus5mFWRRzuJjtAbjk2qwww") 
      {const parent = info.UniqueSovereignBy;
        return {
          id,
          name: account,
          parent: parent,
        };}
        else{
          const parent = identities.identity[info.UniqueSovereignBy]
          return {
            id,
            name: account,
            parent: parent,
          };;
        }
  });
  console.log(identities,'identities')
  // identities.push({name: "1Humanityrvhus5mFWRRzuJjtAbjk2qwww", parent: null})
  return identities
}
export default function IdentityTree ({ events, reactions = [], seenByRelay, ...rest }) {
  //change events to family data format here
  console.log(events,'a')
  if (events.length=== 0) return (<Box>Empty</Box>);
 const familyData = generateIdentityTreeData(events[0], null);
 
  const treeData = generateTreeData(familyData, null);
  console.log(treeData,familyData,'aaaa')
  function renderTreeData(data) {
    console.log(data,'data')
    return data.map(item => (
 
      <TreeNode label={<StyledNode>{item.name}</StyledNode>}>
        {item.children && renderTreeData(item.children)}
      </TreeNode>
    ));
  }
  return (
    <Tree
    visibility= {'hidden'}
    lineColor={'yellow'}
    lineBorderRadius={'10px'}>
      {renderTreeData(treeData)}
    </Tree>
    // renderTreeData([treeData])
  );
};

