export default function ({ app, route, redirect }) {
  console.log('middleware auth loaded')

  const protectedRoutes = ['index']
  const guestRoutes = ['auth-login', 'auth-register']

  const profile = app.$cookies.get('profile') ?? {}
  console.log(profile)

  if (profile.email != undefined && guestRoutes.includes(route.name)) {
    return redirect('/')
  }

  if (profile.email == undefined && protectedRoutes.includes(route.name)) {
    return redirect('/auth')
  }
}
