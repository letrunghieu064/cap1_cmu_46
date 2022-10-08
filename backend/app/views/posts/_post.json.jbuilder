json.extract! post, :id, :name, :img_url, :description, :status, :address, :users_id, :district_id, :created_at, :updated_at
json.url post_url(post, format: :json)
