CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  title VARCHAR(255) NOT NULL,
  
  description TEXT,

  completed BOOLEAN DEFAULT false,
 
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX idx_todos_title ON todos(title);

CREATE INDEX idx_todos_category_id ON todos(category_id);

CREATE INDEX idx_todos_completed ON todos(completed);

CREATE INDEX idx_todos_priority ON todos(priority);