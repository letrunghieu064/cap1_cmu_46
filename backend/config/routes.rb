Rails.application.routes.draw do
  # post 'user_token' => 'user_token#create'
  devise_for :users
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: { registrations: 'registrations' }
      resources :comment_likes
      resources :likes
      resources :posts
      resources :users
      resources :comments
      resources :sessions
      post 'auth/register' , to: 'users#register'
      post 'auth/login' , to: 'users#login'
      get 'test' , to: 'users#test'
      put 'users', to: 'users#update'
      devise_scope :user do
        # post "register", :to => 'registrations#create'
        # post "login", :to => 'sessions#create'
        # delete "logout", :to => 'sessions#destroy'
        # put "users/:id", to: "registrations#update"
      end
    end
  end
end
