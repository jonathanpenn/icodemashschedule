CodeMash::Application.routes.draw do
  get "/javascript_tests" => "test#index"
  root to: 'home#index'
end
