export default function ({ app, route, redirect }) {
  console.log('middleware auth loaded')

  const protectedRoutes = ['index']
  const guestRoutes = ['auth-login', 'auth-register']

  const user = app.$cookies.get('user') ?? {}
  console.log(user)

  if (user.email != undefined && guestRoutes.includes(route.name)) {
    return redirect('/')
  }

  if (user.email == undefined && protectedRoutes.includes(route.name)) {
    return redirect('/auth/login')
  }
}
