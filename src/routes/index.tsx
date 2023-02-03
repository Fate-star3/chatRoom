// 独立配置文件
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Message from '@/pages/Message'

const Contacts = lazy(() => import('@/pages/Contacts'))
const Mine = lazy(() => import('@/pages/Mine'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const MessageDetail = lazy(() => import('@/pages/Message/components/MessageDetail'))
const Search = lazy(() => import('@/pages/Search'))
const UserDetail = lazy(() => import('@/pages/UserDetail'))
const CreateGroup = lazy(() => import('@/pages/CreateGroup'))
const FriendDetail = lazy(() => import('@/pages/FriendDetail'))
const AddFriend = lazy(() => import('@/pages/AddFriend'))
const GroupDetail = lazy(() => import('@/pages/GroupDetail'))

// Routes 不能和react-router-dom 一样
// 使用lazy动态加载组件时候报错如下
// 使用了Suspense 组件 配合lazy使用成功解决
const RoutesConfig = () => {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<Message />} />
        <Route path='/message' element={<Message />} />
        <Route path='/message/detail/:id' element={<MessageDetail />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/mine' element={<Mine />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<Search />} />
        <Route path='/userDetail' element={<UserDetail />} />
        <Route path='/createGroup' element={<CreateGroup />} />
        <Route path='/friendDetail' element={<FriendDetail />} />
        <Route path='/addFriend' element={<AddFriend />} />
        <Route path='/groupDetail' element={<GroupDetail />} />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesConfig
