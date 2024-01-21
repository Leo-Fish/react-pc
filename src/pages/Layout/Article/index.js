import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import './index.scss'
import { Table } from 'antd'
import { Space, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { http } from '@/utils/http'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'

const { RangePicker } = DatePicker
const { Option } = Select

const Article = () => {
  /* eslint-disable no-unused-vars */
  const { channelStore } = useStore()
  const onDelete = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      page: 1,
      per_page: 10
    })
  }
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate()
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`)
  }
  const onFinish = values => {
    const { channel_id, date, status } = values
    const param = {}
    if (status !== -1) {
      param.status = status
    }
    if (channel_id) {
      param.channel_id = channel_id
    }
    if (date) {
      param.start_pubdate = date[0].format('YYYY-MM-DD')
      param.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams(param)
  }
  const [article, setArticle] = useState({
    list: [],
    count: 0
  })

  const onChange = (page) => {
    setParams({
      ...params,
      page
    })
  }

  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })
  useEffect(() => {
    async function loadList () {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data.data

      setArticle({
        list: results,
        count: total_count
      })

    }
    loadList()
  }, [params])

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              onClick={() => goPublish(data)}
              icon={<EditOutlined />
              }
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            // onClick={onDelete} 
            />
          </Space>
        )
      }
    }
  ]
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: ['http://geek.itheima.net/resources/images/15.jpg'],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish}
          initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelStore.channelList ? (
                channelStore.channelList.map((channel) => <Option value={channel.id}>{channel.name}</Option>)
              ) : (
                <div>Loading...</div>
              )}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            <RangePicker ></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
        <Table
          rowKey="id"
          dataSource={article.list}
          columns={columns}
          pagination={{
            total: article.count,
            current: params.page,
            pageSize: params.per_page,
            onChange: onChange
          }
          }
        />
      </Card>
    </div>
  )
}

export default observer(Article)