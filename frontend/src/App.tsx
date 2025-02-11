
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import './App.css'
import { Home } from './Pages/Home';
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import { Publish } from './Pages/Publish';
import { SinglePost } from './Pages/SinglePost';
import { UserPosts } from './Pages/UserPosts';
import { AuthProvider, ProtectedRoute, PublicOnlyRoute } from './context/AuthContext';
import { Profile } from './Pages/Profile';
import { UpdatePost } from './Pages/UpdatePost';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }
          />
          <Route path="/publish" element={<ProtectedRoute>
            <Publish />
          </ProtectedRoute>
          } />

          <Route path="/post/:id" element={<ProtectedRoute>
            <SinglePost />
          </ProtectedRoute>
          } />

          <Route path="/signup" element={<PublicOnlyRoute>
            <Signup />
          </PublicOnlyRoute>} />

          <Route path="/signin" element={<PublicOnlyRoute>
            <Signin />
          </PublicOnlyRoute>
          } />

          <Route path="/user/:identifier/posts" element={<ProtectedRoute>
            <UserPosts />
          </ProtectedRoute>
          } />

          <Route path='/profile/:identifier' element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />

          <Route path='/update/post/:id' element={<ProtectedRoute>
            <UpdatePost />
          </ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
