const getters = {
  sidebar: state => state.app.sidebar,
  userToken: state => state.app.userToken,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
