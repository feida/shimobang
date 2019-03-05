const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  // roles: state => state.user.roles,
  loading: state => state.user.loading,
  menuData: state => state.user.menuData,
  menuDataItem: state => state.user.menuDataItem
}
export default getters
