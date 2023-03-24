import styled from 'styled-components';

const SidebarWhole = () => {

    return (
        <Sidebar>  
            <SidebarHeader>Telegram</SidebarHeader>
            <SidebarItem active>Chats</SidebarItem>
            <SidebarItem>Contacts</SidebarItem>
            <SidebarItem>Settings</SidebarItem>
        </Sidebar>
    )
};

export default SidebarWhole;

const Sidebar = styled.div`
  width: 20%;
  background-color: #0088cc;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 15px;
  font-size: 24px;
  font-weight: bold;
`;

const SidebarItem = styled.div`
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  ${(props) => props.active && `
    background-color: #0077b3;
    font-weight: bold;
  `}

  &:hover {
    background-color: #0077b3;
  }
`;