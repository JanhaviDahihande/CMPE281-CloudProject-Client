// @flow

export const navigation2 = Object.freeze({
  brand: 'reactDirectorAdmin',
  leftLinks: [],
  rightLinks: [
    {
      label: 'Home',
      link: '/',
      view: 'home',
      isRouteBtn: true,
    },
    {
      label: 'About',
      link: '/about',
      view: 'about',
      isRouteBtn: true,
    },
  ],
  sideMenu: [
    // group menu #1
    {
      id: 1,
      group: 'Dashboard  ',
      menus: [
        {
          name: 'Dashboard preview',
          linkTo: '/',
          faIconName: 'fa-eye',
        },
        {
          name: 'Users',
          linkTo: '/Dashboard/earningGraph',
          faIconName: 'fa-area-chart',
        },
        {
          name: 'Map View',
          linkTo: '/Dashboard/notifications',
          faIconName: 'fa-bell',
        },
        {
          name: 'Sensor View',
          linkTo: '/Dashboard/workProgress',
          faIconName: 'fa-briefcase',
        },
        {
          name: 'Billing View',
          linkTo: '/Dashboard/twitterFeed',
          faIconName: 'fa-twitter',
        },
        {
          name: 'Billing',
          linkTo: '/Dashboard/billinguser',
          faIconName: 'fa-dollar',
        },
        {
          name: 'Earnings',
          linkTo: '/Dashboard/billingadmin',
          faIconName: 'fa-dollar',
        },
        {
          name: 'Team Mates',
          linkTo: '/Dashboard/teamMates',
          faIconName: 'fa-user',
        },
        {
          name: 'Data View',
          linkTo: '/Dashboard/todoList',
          faIconName: 'fa-check',
        },
        {
          name: 'Intelligent Clusters',
          linkTo: '/Dashboard/managecluster',
          faIconName: 'fa-eye',
        },
      ],
    },
    // Manage Infrastructure
    {
      id: 2,
      group: 'Manage Infrastructure',
      menus: [
        {
          name: 'Intelligent Clusters',
          linkTo: '/managecluster',
          faIconName: 'fa-eye',
        },
        {
          name: 'Intelligent Nodes',
          linkTo: '/managenode',
          faIconName: 'fa-eye',
        },
        {
          name: 'Intelligent Sensors',
          linkTo: '/managesensor',
          faIconName: 'fa-eye',
        },
      ],
    },
    // group menu #2
    {
      id: 3,
      group: 'General',
      menus: [
        {
          name: 'General preview',
          linkTo: '/general',
          faIconName: 'fa-eye',
        },
        {
          name: 'Breadcrumb',
          linkTo: '/general/breadcrumb',
          faIconName: 'fa-bars',
        },
        {
          name: 'Stat',
          linkTo: '/general/stat',
          faIconName: 'fa-bar-chart',
        },
        {
          name: 'Basic progress bars',
          linkTo: '/general/basicProgressBars',
          faIconName: 'fa-tasks',
        },
        {
          name: 'Tab panels',
          linkTo: '/general/tabPanels',
          faIconName: 'fa-columns',
        },
        {
          name: 'Striped progress bar',
          linkTo: '/general/stripedProgressBars',
          faIconName: 'fa-tasks',
        },
        {
          name: 'Alerts',
          linkTo: '/general/alerts',
          faIconName: 'fa-exclamation-triangle',
        },
        {
          name: 'Pagination',
          linkTo: '/general/pagination',
          faIconName: 'fa-sort',
        },
        {
          name: 'Default buttons',
          linkTo: '/general/defaultButtons',
          faIconName: 'fa-hand-o-up',
        },
      ],
    },
    // group menu #3
    {
      id: 4,
      group: 'BasicElements',
      menus: [
        {
          name: 'Basic Elements preview',
          linkTo: '/basicElements',
          faIconName: 'fa-eye',
        },
      ],
    },
    // group menu #4
    {
      id: 5,
      group: 'SimpleTables',
      menus: [
        {
          name: 'Simple tables preview',
          linkTo: '/simpleTables',
          faIconName: 'fa-eye',
        },
      ],
    },
  ],
});
