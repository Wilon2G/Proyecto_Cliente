import { redirect } from '@remix-run/node';
//Poner comprobación de log in, si hay login mandar directamente a home
export function loader() {
  return redirect('/login');
}
//weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
