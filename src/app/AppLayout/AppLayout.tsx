import * as React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  ButtonVariant,
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownToggle,
  Avatar,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  SkipToContent
} from '@patternfly/react-core';
import { routes, IAppRoute, IAppRouteGroup } from '@app/routes';
// import logo from '@app/bgimages/Patternfly-Logo.svg';
import logo from 'src/Assets/Lucitec.png';
import { BellIcon, CogIcon } from '@patternfly/react-icons';
import imgAvatar from '!!url-loader!@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [username, setUserName] = React.useState('');

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  const onDropdownSelect = event => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function LogoImg() {
    const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <img src={logo} onClick={handleClick} alt="PatternFly Logo" className="logo" />
    );
  }
  const userDropdownItems = [
    <DropdownGroup key="group 2">
        <DropdownItem key="group 2 profile">My profile</DropdownItem>
        <DropdownItem key="group 2 user" component="button">
            User management
        </DropdownItem>
    </DropdownGroup>
  ];

  const headerTools = (
    <PageHeaderTools>
        <PageHeaderToolsGroup
            visibility={{
                default: 'hidden',
                lg: 'visible'
            }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */
        >
            <PageHeaderToolsItem>
                <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
                    <CogIcon />
                </Button>
            </PageHeaderToolsItem>
            <PageHeaderToolsItem>
                <Button aria-label="Help actions" variant={ButtonVariant.plain}>
                    <HelpIcon />
                </Button>
            </PageHeaderToolsItem>
            <PageHeaderToolsItem
                /** visibility={{ default: 'hidden', md: 'visible' }}  this user dropdown is hidden on mobile sizes */
            >
                <Dropdown
                    isPlain
                    position="right"
                    onSelect={onDropdownSelect}
                    isOpen={isDropdownOpen}
                    toggle={<DropdownToggle onToggle={onDropdownToggle}>{username}</DropdownToggle>}
                    dropdownItems={userDropdownItems}
                />
            </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        <Avatar src={imgAvatar} alt="" />
    </PageHeaderTools>
);

  const Header = (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      headerTools={headerTools}
    />
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`}>
      <NavLink exact to={route.path} activeClassName="pf-m-current">
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent onClick={(event) => {
      event.preventDefault();
      const primaryContentContainer = document.getElementById(pageId);
      primaryContentContainer && primaryContentContainer.focus();
    }} href={`#${pageId}`}>
      Skip to Content
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId={pageId}
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  );
}

export { AppLayout };
