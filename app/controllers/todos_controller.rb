class TodosController < ApplicationController
  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  def create
    @todo = Todo.new(todo_param)
    if @todo.save
      render json: @todo
    else
      render json: {errors: @todo.errors }, status: 400
    end
  end

  def update
    todo = Todo.find(params[:id])
    # TODO change the update_attributes to update as it is deprecated
    todo.update_attributes(todo_param)
    render json: todo
  end

  def destroy
    # todo make this non-destructive to data
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  def show
    @todo = Todo.find(params[:id])
    if @todo
      render json: @todo
    else
      render json: {errors: 'todo not found' }, status: 400
    end
  end

  private
    def todo_param
      params.require(:todo).permit(:title, :done)
    end 
end
