export default function ({ app, route, redirect }) {
  const protectedRoutes = ['index', 'profil', 'stat', 'transaction']
  const guestRoutes = ['auth-login', 'auth-register']

  const user = app.$cookies.get('user') ?? {}

  if (user.email != undefined && guestRoutes.includes(route.name)) {
    return redirect('/')
  }

  if (user.email == undefined && protectedRoutes.includes(route.name)) {
    return redirect('/auth/login')
  }
}
