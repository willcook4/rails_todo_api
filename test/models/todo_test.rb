require 'test_helper'

class TodoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should not save a todo without a title" do
    todo = Todo.new
    assert_not todo.save, "Saved the todo without a title"
  end

  test "todo#index should return an array of todos" do
    todos = Todo.order("created_at DESC")
    assert todos.length == 2
  end
end
