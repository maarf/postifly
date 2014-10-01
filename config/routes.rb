Rails.application.routes.draw do
  
  root 'desktops#show'
  
  resources :desktops
  
end
