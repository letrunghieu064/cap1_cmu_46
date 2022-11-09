Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users
      # root 'home#index'
      # get 'home/about'

      resources :follows
      resources :comment_likes
      resources :likes
      resources :districts
      resources :wards, defaults: { format: 'json' }
      resources :posts
      resources :users
      resources :comments
    end
  end
end
