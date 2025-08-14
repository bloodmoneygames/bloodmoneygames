import ServerContext from "server-only-context";
import {IMenu} from "../interfaces/menus";
import {ISiteOptions} from "../interfaces/siteoptions";
import {IPostCard} from "../interfaces/posts";

export const [
  getMenus,
  setMenus
] = ServerContext<IMenu[] | null>(null);

export const [
  getSidePosts,
  setSidePosts
] = ServerContext<IPostCard[] | false>(false);

const defaultOptions = {
  title: 'Set title',
  siteTitle: 'Set title',
  description: 'Set description',
  sweetcoreSettings: {
    homepage: {
      iframe: ''
    },
    promo: {
      top: '',
      bottom: '',
      side: ''
    },
    footer: {
      copyright: 'Set copyright'
    },
  }
}
export const [
  getSiteoptions,
  setSiteoptions
] = ServerContext<ISiteOptions>(defaultOptions);


export const getMenusContext = () => {
  const menus = getMenus()
  if (!menus) throw new Error("Calling getMenus from server-context before it is set. Remember to set the menus from the current page params.")
  return menus
}

export const setMenusContext = setMenus;

export const getSiteOptionsContext = () => {
  const siteoptions = getSiteoptions()
  if (!siteoptions) throw new Error("Calling getSiteOptions from server-context before it is set. Remember to set the site options from the current page params.")
  return siteoptions
}

export const setSiteOptionsContext = setSiteoptions;

export const getSidePostsContext = () => {
  const sidePosts = getSidePosts()
  if (!sidePosts) throw new Error("Calling getSidePosts from server-context before it is set. Remember to set the side posts from the current page params.")
  return sidePosts
}

export const setSidePostsContext = setSidePosts;