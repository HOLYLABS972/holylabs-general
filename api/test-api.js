const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing Blog Platform API...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);

    // Test creating a blog post
    console.log('\n2. Testing blog post creation...');
    const blogData = {
      title: {
        en: "Test Blog Post from API",
        he: "פוסט בלוג בדיקה מה-API"
      },
      content: {
        en: "# Test Blog Post\n\nThis is a **test blog post** created via the API.\n\n## Features\n\n- Markdown support\n- Bilingual content\n- Automatic slug generation\n\n*This post was created by an AI assistant.*",
        he: "# פוסט בלוג בדיקה\n\nזהו **פוסט בלוג בדיקה** שנוצר דרך ה-API.\n\n## תכונות\n\n- תמיכה ב-Markdown\n- תוכן דו-לשוני\n- יצירת slug אוטומטית\n\n*פוסט זה נוצר על ידי עוזר AI.*"
      },
      excerpt: {
        en: "A test blog post demonstrating the API functionality with Markdown support and bilingual content.",
        he: "פוסט בלוג בדיקה המדגים את פונקציונליות ה-API עם תמיכה ב-Markdown ותוכן דו-לשוני."
      },
      tags: ["test", "api", "demo", "markdown"],
      published: false,
      author: {
        name: "AI Test Assistant",
        email: "test@company.com"
      }
    };

    const createResponse = await fetch(`${API_BASE}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData)
    });

    const createResult = await createResponse.json();
    
    if (createResult.success) {
      console.log('✅ Blog post created successfully');
      console.log('   ID:', createResult.data.id);
      console.log('   Title:', createResult.data.title.en);
      
      const blogId = createResult.data.id;

      // Test getting the blog post
      console.log('\n3. Testing blog post retrieval...');
      const getResponse = await fetch(`${API_BASE}/api/blogs/${blogId}`);
      const getResult = await getResponse.json();
      
      if (getResult.success) {
        console.log('✅ Blog post retrieved successfully');
        console.log('   Title:', getResult.data.title.en);
        console.log('   Content length:', getResult.data.content.en.length);
      } else {
        console.log('❌ Failed to retrieve blog post:', getResult.error);
      }

      // Test updating the blog post
      console.log('\n4. Testing blog post update...');
      const updateData = {
        published: true,
        tags: ["test", "api", "demo", "markdown", "updated"]
      };

      const updateResponse = await fetch(`${API_BASE}/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const updateResult = await updateResponse.json();
      
      if (updateResult.success) {
        console.log('✅ Blog post updated successfully');
      } else {
        console.log('❌ Failed to update blog post:', updateResult.error);
      }

      // Test getting all blogs
      console.log('\n5. Testing get all blogs...');
      const getAllResponse = await fetch(`${API_BASE}/api/blogs?limit=5`);
      const getAllResult = await getAllResponse.json();
      
      if (getAllResult.success) {
        console.log('✅ Retrieved all blogs successfully');
        console.log('   Count:', getAllResult.count);
      } else {
        console.log('❌ Failed to retrieve blogs:', getAllResult.error);
      }

      // Test getting tags
      console.log('\n6. Testing get tags...');
      const tagsResponse = await fetch(`${API_BASE}/api/tags`);
      const tagsResult = await tagsResponse.json();
      
      if (tagsResult.success) {
        console.log('✅ Retrieved tags successfully');
        console.log('   Tags:', tagsResult.data);
      } else {
        console.log('❌ Failed to retrieve tags:', tagsResult.error);
      }

      // Test deleting the blog post
      console.log('\n7. Testing blog post deletion...');
      const deleteResponse = await fetch(`${API_BASE}/api/blogs/${blogId}`, {
        method: 'DELETE'
      });

      const deleteResult = await deleteResponse.json();
      
      if (deleteResult.success) {
        console.log('✅ Blog post deleted successfully');
      } else {
        console.log('❌ Failed to delete blog post:', deleteResult.error);
      }

    } else {
      console.log('❌ Failed to create blog post:', createResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🏁 API testing completed!');
}

// Run the test
testAPI(); 