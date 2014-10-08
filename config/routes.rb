Rails.application.routes.draw do
  
  root "desktops#index"
  
  resources :desktops
  resources :notes
  
end
