Rails.application.routes.draw do
<<<<<<< HEAD
  root   'home#index'
  get    'auth'            => 'home#auth'
 
  post   'user_token'      => 'user_token#create'
  resources :follows
  resources :comment_likes
  resources :likesS
  resources :wards
  resources :districts
  resources :posts
  resources :users
  resources :comments
  # get    '/users'          => 'users#index'
  # get    '/users/current'  => 'users#current'
  # post   '/users/create'   => 'users#create'
  # patch  '/user/:id'       => 'users#update'
  # delete '/user/:id'       => 'users#destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
=======
  devise_for :users
  # root 'home#index'
  # get 'home/about'
  namespace :api do
    namespace :v1 do
      resources :follows
      resources :comment_likes
      resources :likes
      resources :districts
      resources :wards
      resources :posts
      resources :users
      resources :comments
    end
  end
>>>>>>> 302eb69a6dd89198e4d0adde8f9e2dcfd143feb2
end
