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
      post 'password/forgot', to: 'users#forgot'
      post 'password/reset', to: 'password#reset'
      post 'search', to: 'posts#search'
      devise_scope :user do
        # post "register", :to => 'registrations#create'
        # post "login", :to => 'sessions#create'
        # delete "logout", :to => 'sessions#destroy'
        # put "users/:id", to: "registrations#update"
      end
      namespace :admin do
        delete 'users/:id', to: 'users#destroy'
        put 'posts/:id', to: 'posts#update'
        delete 'posts/:id', to: 'posts#destroy'
        delete 'comments/:id', to: 'comments#destroy'
      end
    end
  end
end
