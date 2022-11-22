Rails.application.routes.draw do
  # devise_for :users, path: '', path_names: {
  #   sign_in: 'login',
  #   sign_out: 'logout',
  #   registration: 'register'
  # }

  namespace :api do
    namespace :v1 do
      resources :comment_likes
      resources :likes
      resources :posts
      resources :users
      resources :comments
      resources :sessions
      post 'auth/register' , to: 'users#register'
      post 'auth/login' , to: 'users#login'
      # devise_scope :user do
      #   post "register", :to => 'registrations#create'
      #   post "login", :to => 'sessions#create'
      #   delete "logout", :to => 'sessions#destroy'
      # end
    end
  end
end
