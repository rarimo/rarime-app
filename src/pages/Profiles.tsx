import { PageTitles } from '@/common'
import { useAuth } from '@/hooks'

export default function Profiles() {
  const { logout } = useAuth()

  return (
    <>
      <PageTitles title={'Profiles'} />
      <button onClick={logout}>LogOut</button>
    </>
  )
}
