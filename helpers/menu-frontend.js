const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
          titulo:'Principal',
          icon:'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', url:'/'},
            {titulo: 'Gráficas', url:'grafica1'},
            {titulo: 'Perfil', url:'perfil'},
            {titulo: 'ProgressBar', url:'progress'},
            {titulo: 'Promesas', url:'promesas'},
            {titulo: 'Rxjs', url:'rxjs'}
          ]
        },
        {
          titulo:'Mantenimiento',
          icon:'mdi mdi-folder-lock-open',
          submenu: [
            {titulo: 'Hospitales', url:'hospitales'},
            {titulo: 'Médicos', url:'medicos'},
          ]
        }
      ];

      if(role === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({titulo: 'Usuarios', url:'usuarios'})
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}