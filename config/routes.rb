Rails.application.routes.draw do
  
  root to: redirect(path: '/desktops/1')
  
  resources :desktops
  resources :notes
  
end
