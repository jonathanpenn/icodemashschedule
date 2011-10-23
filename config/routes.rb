CodeMash::Application.routes.draw do
  get "/test" => "test#index"
  root to: 'home#index'
end
