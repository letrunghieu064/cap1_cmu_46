Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'home/about'

  # resources :follows
  # resources :comment_likes
  # resources :likes
  # resources :wards
  # resources :districts
  # resources :posts
  resources :users
  # resources :comments
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
