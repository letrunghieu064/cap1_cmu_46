Rails.application.routes.draw do
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
      resources :sessions
      devise_scope :user do
        post "register", :to => 'registrations#create'
        post "login", :to => 'sessions#create'
        delete "logout", :to => 'sessions#destroy'
      end
    end
  end
end
