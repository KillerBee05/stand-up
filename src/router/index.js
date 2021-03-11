import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import UserReport from '@/components/UserReport.vue'
import Summary from '@/components/Summary.vue'
import Register from '@/views/Register.vue'
import Account from '@/views/Account.vue'
import Login from '@/views/Login.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Admin from '@/components/Admin.vue'
import ManageProject from '@/components/ManageProject.vue'
import AllProjects from '@/components/AllProjects.vue'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userreport',
      name: 'user-report',
      component: UserReport,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/resetpassword',
      name: 'resetPassword',
      component: ResetPassword,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/manageproject',
      name: 'manageproject',
      component: ManageProject,
      meta: {
        requiresAdmin: true
      }
    },
    {
      path: '/allprojects',
      name: 'allprojects',
      component: AllProjects,
      meta: {
        requiresAdmin: true
      }
    },
  ]
});

// Nav Guards
router.beforeEach((to, from, next) => {
  // Check Guards
  const user = firebase.auth().currentUser;
  if(to.matched.some(record => record.meta.requiresAuth)){
    // check if not logged in
    if(!user){
      // Go to Login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if is logged in
    if(user){
      // Go to Login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    // check if is logged in
      user.getIdTokenResult().then(idTokenResult => {
        var isAdmin = idTokenResult.claims.admin;
        if(!isAdmin){
          // Go to Login
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          });
        } else {
          // proceed to route
          next();
        }
    })
  } else {
    // proceed to route
      next();
  }

});

export default router;
