import create from 'zustand'

interface IProps {
  isLogin:boolean,
  login: () => void,
  logout: () => void
}
const useAdminStore = create<IProps>((set) => ({
  isLogin: false,
  login: () => set({isLogin:true}),
  logout: () => set({isLogin:false})
}))

export default useAdminStore